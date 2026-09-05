class BackendDB {
    constructor(baseUrl = '') {
        this.baseUrl = baseUrl;
        this.token = sessionStorage.getItem('imperio_session_token') || '';
        this.supabase = null;
        this.init();
    }

    getConfig() {
        const url = (window.SUPABASE_URL || window.__SUPABASE_URL__ || '').trim();
        const key = (window.SUPABASE_ANON_KEY || window.__SUPABASE_ANON_KEY__ || '').trim();
        return { url, key };
    }

    init() {
        const { url, key } = this.getConfig();
        const supabaseLib = typeof window !== 'undefined' && window.supabase ? window.supabase :
            (typeof supabase !== 'undefined' ? supabase : null);

        if (url && key && supabaseLib && typeof supabaseLib.createClient === 'function') {
            this.supabase = supabaseLib.createClient(url, key);
            return;
        }

        // Intentar detectar la versión 2.x cuando el SDK se expone globalmente como "supabase".
        if (url && key && typeof window !== 'undefined' && window.supabase && typeof window.supabase.createClient === 'function') {
            this.supabase = window.supabase.createClient(url, key);
            return;
        }

        // Detectar el cliente directamente si ya fue creado en otro lugar.
        if (typeof window !== 'undefined' && window.supabase && typeof window.supabase.from === 'function') {
            this.supabase = window.supabase;
            return;
        }

        this.supabase = null;
    }

    ensureSupabase() {
        if (!this.supabase) {
            this.init();
        }
        return this.supabase;
    }

    async hashPassword(password) {
        const encoder = new TextEncoder();
        const buffer = await crypto.subtle.digest('SHA-256', encoder.encode(password));
        return Array.from(new Uint8Array(buffer)).map(byte => byte.toString(16).padStart(2, '0')).join('');
    }

    async getNextPublicId() {
        const { data: users, error } = await this.supabase.from('users').select('save_data');
        if (error) throw error;
        const usedIds = new Set((users || [])
            .map(user => String(user.save_data?.publicId || ''))
            .filter(Boolean));
        let nextId = (users || []).length + 1;
        while (usedIds.has(String(nextId))) nextId++;
        return String(nextId);
    }

    async getSequentialPublicId(username) {
        const normalized = String(username || '').trim().toLowerCase();
        const { data: users, error } = await this.supabase.from('users').select('username, created_at, save_data');
        if (error) throw error;
        const orderedUsers = [...(users || [])].sort((first, second) => {
            const firstTime = Date.parse(first.created_at || '') || 0;
            const secondTime = Date.parse(second.created_at || '') || 0;
            return firstTime - secondTime;
        });
        const position = orderedUsers.findIndex(user => String(user.username).toLowerCase() === normalized);
        if (position < 0) return null;
        const publicId = String(position + 1);
        const currentUser = orderedUsers[position];
        if (String(currentUser.save_data?.publicId || '') !== publicId) {
            const { error: updateError } = await this.supabase.from('users').update({
                save_data: { ...(currentUser.save_data || {}), publicId },
                updated_at: new Date().toISOString()
            }).eq('username', currentUser.username);
            if (updateError) throw updateError;
        }
        return publicId;
    }

    async createUser(user, password, data) {
        this.ensureSupabase();
        const username = (user || '').trim().toLowerCase();
        if (!username || !password) {
            throw new Error('Completa usuario y contraseña');
        }
        if (!password || password.length < 8) {
            throw new Error('La contraseña debe tener al menos 8 caracteres');
        }

        const passwordHash = await this.hashPassword(password);

        if (!this.supabase) {
            throw new Error('Supabase no disponible. Configura SUPABASE_URL y SUPABASE_ANON_KEY.');
        }

        try {
            const { data: existingUser, error: selectError } = await this.supabase
                .from('users')
                .select('username')
                .eq('username', username)
                .maybeSingle();

            if (selectError) {
                throw new Error('Error al verificar el usuario en Supabase: ' + selectError.message);
            }

            if (existingUser) {
                throw new Error('Este usuario ya existe');
            }

            const publicId = await this.getNextPublicId();
            const saveData = { ...data, publicId };
            const { error } = await this.supabase.from('users').insert({
                username,
                password_hash: passwordHash,
                save_data: saveData,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            });

            if (error) {
                throw new Error('No se pudo crear el usuario en Supabase: ' + error.message);
            }

            return { ok: true, data: saveData };
        } catch (error) {
            if (error.message === 'Este usuario ya existe') {
                throw error;
            }
            throw new Error('Error creando usuario: ' + (error.message || error));
        }
    }

    async createAuthUser(username, email, password, saveData) {
        this.ensureSupabase();
        if (!this.supabase?.auth) throw new Error('Supabase Auth no está disponible.');
        const normalizedUsername = String(username || '').trim().toLowerCase();
        const normalizedEmail = String(email || '').trim().toLowerCase();
        const { data: existingProfile, error: profileLookupError } = await this.supabase
            .from('users')
            .select('username')
            .eq('username', normalizedUsername)
            .maybeSingle();
        if (profileLookupError) throw profileLookupError;
        if (existingProfile) throw new Error('Este usuario ya existe');
        const { data: authData, error: authError } = await this.supabase.auth.signUp({
            email: normalizedEmail,
            password,
            options: { data: { username: normalizedUsername }, emailRedirectTo: window.location.origin + window.location.pathname }
        });
        if (authError) throw authError;
        if (!authData.user) throw new Error('No se pudo crear la cuenta.');
        const profileData = { ...saveData, authUserId: authData.user.id, usernameSetupPending: true };
        const existingAuthProfile = await this.supabase.from('users').select('username')
            .contains('save_data', { authUserId: authData.user.id }).maybeSingle();
        if (existingAuthProfile.error) throw existingAuthProfile.error;
        const existingUsernameProfile = existingAuthProfile.data ? null : await this.supabase.from('users')
            .select('username')
            .eq('username', normalizedUsername)
            .maybeSingle();
        if (existingUsernameProfile?.error) throw existingUsernameProfile.error;
        const profilePayload = {
            username: normalizedUsername,
            password_hash: '',
            save_data: profileData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
        const profileQuery = existingAuthProfile.data || existingUsernameProfile?.data
            ? this.supabase.from('users').update({
                save_data: profileData,
                updated_at: profilePayload.updated_at
            }).eq('username', (existingAuthProfile.data || existingUsernameProfile.data).username)
            : this.supabase.from('users').insert(profilePayload);
        const { error: profileError } = await profileQuery;
        if (profileError) throw profileError;
        return { ok: true };
    }

    async signIn(user, password) {
        const username = (user || '').trim().toLowerCase();
        if (!username || !password) {
            throw new Error('Completa usuario y contraseña');
        }
        this.ensureSupabase();

        if (!this.supabase) {
            throw new Error('Supabase no disponible. Ingresa solo cuando el servicio esté configurado.');
        }

        const { data, error } = await this.supabase
            .from('users')
            .select('password_hash, save_data')
            .eq('username', username)
            .maybeSingle();

        if (error) {
            throw error;
        }

        if (!data) {
            throw new Error('Usuario no encontrado');
        }

        const passwordHash = await this.hashPassword(password);
        if (data.password_hash !== passwordHash) {
            throw new Error('Contraseña incorrecta');
        }

        this.token = username;
        sessionStorage.setItem('imperio_session_token', this.token);
        const saveData = data.save_data || {};
        return saveData;
    }

    async signInWithEmail(email, password) {
        this.ensureSupabase();
        if (!this.supabase?.auth) throw new Error('Supabase Auth no está disponible.');
        const normalizedEmail = String(email || '').trim().toLowerCase();
        const { data: authData, error: authError } = await this.supabase.auth.signInWithPassword({ email: normalizedEmail, password });
        if (authError) {
            const authMessage = String(authError.message || '').toLowerCase();
            const canTryLegacyProfile = authMessage.includes('invalid login credentials') || authMessage.includes('invalid user credentials');
            if (!canTryLegacyProfile) throw authError;

            const { data: legacyProfile, error: legacyError } = await this.supabase.from('users')
                .select('username, password_hash, save_data')
                .contains('save_data', { email: normalizedEmail })
                .maybeSingle();
            if (legacyError) throw legacyError;
            if (!legacyProfile?.password_hash) throw authError;

            const passwordHash = await this.hashPassword(password);
            if (legacyProfile.password_hash !== passwordHash) throw authError;
            this.token = legacyProfile.username;
            sessionStorage.setItem('imperio_session_token', this.token);
            return { ...(legacyProfile.save_data || {}), __username: legacyProfile.username };
        }
        const authUser = authData.user;
        let { data: profile, error: profileError } = await this.supabase.from('users')
            .select('username, save_data').contains('save_data', { authUserId: authUser.id }).maybeSingle();
        if (profileError) throw profileError;
        if (!profile && authUser.email) {
            const fallback = await this.supabase.from('users')
                .select('username, save_data').contains('save_data', { email: normalizedEmail }).maybeSingle();
            if (fallback.error) throw fallback.error;
            profile = fallback.data;
            if (profile) {
                const repairedSaveData = { ...(profile.save_data || {}), authUserId: authUser.id, email: normalizedEmail };
                const { error: repairError } = await this.supabase.from('users').update({
                    save_data: repairedSaveData,
                    updated_at: new Date().toISOString()
                }).eq('username', profile.username);
                if (repairError) throw repairError;
                profile.save_data = repairedSaveData;
            }
        }
        if (!profile) throw new Error('Perfil de juego no encontrado.');
        const saveData = { ...(profile.save_data || {}), email: authUser.email?.toLowerCase() };
        const { error: emailSaveError } = await this.supabase.from('users').update({
            save_data: saveData,
            updated_at: new Date().toISOString()
        }).eq('username', profile.username);
        if (emailSaveError) throw emailSaveError;
        this.token = profile.username;
        sessionStorage.setItem('imperio_session_token', this.token);
        return { ...saveData, __username: profile.username };
    }

    async resendSignupConfirmation(email) {
        this.ensureSupabase();
        if (!this.supabase?.auth) throw new Error('Supabase Auth no está disponible.');
        const normalizedEmail = String(email || '').trim().toLowerCase();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
            throw new Error('Ingresa un correo válido.');
        }
        const { error } = await this.supabase.auth.resend({ type: 'signup', email: normalizedEmail });
        if (error) throw error;
    }

    async resetPasswordForEmail(email) {
        this.ensureSupabase();
        if (!this.supabase?.auth) throw new Error('Supabase Auth no está disponible.');
        const normalizedEmail = String(email || '').trim().toLowerCase();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
            throw new Error('Ingresa un correo válido.');
        }
        const { error } = await this.supabase.auth.resetPasswordForEmail(normalizedEmail, {
            redirectTo: window.location.origin + window.location.pathname
        });
        if (error) throw error;
    }

    async signInWithGoogle() {
        this.ensureSupabase();
        if (!this.supabase?.auth) throw new Error('Supabase Auth no está disponible.');
        const callbackUrl = new URL('index.html', window.location.href).href;
        const { error } = await this.supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: callbackUrl,
                queryParams: { prompt: 'select_account' }
            }
        });
        if (error) throw error;
    }

    async getGoogleProfile() {
        this.ensureSupabase();
        if (!this.supabase?.auth) return null;
        const { data, error } = await this.supabase.auth.getSession();
        if (error) throw error;
        const user = data.session?.user;
        if (!user) return null;
        const username = `google_${user.id.replace(/[^a-z0-9]/gi, '').slice(0, 24)}`.toLowerCase();
        const googleEmail = String(user.email || '').trim().toLowerCase();
        const profilesResult = await this.supabase.from('users').select('username, save_data');
        if (profilesResult.error) throw profilesResult.error;
        const emailName = googleEmail.split('@')[0].replace(/[^a-z0-9_]/g, '');
        const profiles = profilesResult.data || [];
        const emailProfiles = profiles.filter(item =>
            String(item.save_data?.email || '').trim().toLowerCase() === googleEmail
        );
        const recoveredProfile = profiles
            .filter(item => !item.username.startsWith('google_'))
            .filter(item => emailName.startsWith(item.username.toLowerCase()))
            .sort((first, second) => second.username.length - first.username.length)[0];
        const profileByEmail = emailProfiles.find(item => !item.username.startsWith('google_'))
            || recoveredProfile
            || emailProfiles[0];
        const googleProfile = profiles.find(item => item.save_data?.googleUserId === user.id);
        if (profileByEmail) {
            const profile = profileByEmail;
            const linkedSaveData = { ...(profile.save_data || {}), googleUserId: user.id };
            const { error: linkError } = await this.supabase.from('users').update({
                save_data: linkedSaveData,
                updated_at: new Date().toISOString()
            }).eq('username', profile.username);
            if (linkError) throw linkError;
            this.token = profile.username;
            sessionStorage.setItem('imperio_session_token', profile.username);
            const needsGoogleSetup = Boolean(
                linkedSaveData.usernameSetupPending
                || !linkedSaveData.preferencias?.moneda
                || profile.username.startsWith('google_')
                || profile.username.startsWith('usuario_')
            );
            return {
                username: profile.username,
                data: linkedSaveData,
                isNew: needsGoogleSetup,
                isGoogle: true
            };
        }
        if (googleProfile) {
            this.token = googleProfile.username;
            sessionStorage.setItem('imperio_session_token', googleProfile.username);
            const googleSaveData = googleProfile.save_data || {};
            return {
                username: googleProfile.username,
                data: { ...googleSaveData, email: googleEmail },
                isNew: Boolean(
                    googleSaveData.usernameSetupPending
                    || !googleSaveData.preferencias?.moneda
                    || googleProfile.username.startsWith('google_')
                ),
                isGoogle: true
            };
        }
        this.token = username;
        sessionStorage.setItem('imperio_session_token', username);
        const googleSaveData = {
            googleUserId: user.id,
            email: user.email?.toLowerCase(),
            usernameSetupPending: true,
            publicId: await this.getNextPublicId()
        };
        const { error: insertError } = await this.supabase.from('users').insert({
            username, password_hash: '', save_data: googleSaveData,
            created_at: new Date().toISOString(), updated_at: new Date().toISOString()
        });
        if (insertError) throw insertError;
        return { username, data: googleSaveData, isNew: true, isGoogle: true };
    }

    async getAuthProfile() {
        this.ensureSupabase();
        if (!this.supabase?.auth) return null;
        const authorizationCode = new URLSearchParams(window.location.search).get('code');
        if (authorizationCode) {
            const { error: exchangeError } = await this.supabase.auth.exchangeCodeForSession(authorizationCode);
            if (exchangeError) throw exchangeError;
        }
        const { data, error } = await this.supabase.auth.getSession();
        if (error) throw error;
        const user = data.session?.user;
        if (!user) return null;
        const provider = user.app_metadata?.provider;
        if (provider === 'google' || user.identities?.some(identity => identity.provider === 'google')) {
            return this.getGoogleProfile();
        }
        let { data: profile, error: profileError } = await this.supabase.from('users')
            .select('username, save_data').contains('save_data', { authUserId: user.id }).maybeSingle();
        if (profileError) throw profileError;
        if (!profile && user.email) {
            const fallback = await this.supabase.from('users')
                .select('username, save_data').contains('save_data', { email: user.email.toLowerCase() }).maybeSingle();
            if (fallback.error) throw fallback.error;
            profile = fallback.data;
            if (profile) {
                const repairedSaveData = { ...(profile.save_data || {}), authUserId: user.id, email: user.email.toLowerCase() };
                const { error: repairError } = await this.supabase.from('users').update({
                    save_data: repairedSaveData,
                    updated_at: new Date().toISOString()
                }).eq('username', profile.username);
                if (repairError) throw repairError;
                profile.save_data = repairedSaveData;
            }
        }
        if (!profile) throw new Error('Perfil de juego no encontrado.');
        this.token = profile.username;
        sessionStorage.setItem('imperio_session_token', this.token);
        return {
            username: profile.username,
            data: { ...(profile.save_data || {}), authUserId: user.id },
            isNew: Boolean(profile.save_data?.usernameSetupPending),
            isGoogle: false
        };
    }

    async signOutGoogle() {
        this.ensureSupabase();
        if (this.supabase?.auth) await this.supabase.auth.signOut();
    }

    async signOutAuth() {
        this.ensureSupabase();
        if (this.supabase?.auth) await this.supabase.auth.signOut();
    }

    async saveUser(user, data) {
        this.ensureSupabase();
        const username = (user || '').trim().toLowerCase();
        if (!username) {
            return { ok: true };
        }

        if (!this.supabase) {
            throw new Error('Supabase no disponible. No se puede guardar el progreso.');
        }

        try {
            const { data: updatedUser, error } = await this.supabase.from('users').update({
                save_data: data,
                updated_at: new Date().toISOString()
            }).eq('username', username).select('username').maybeSingle();

            if (error) {
                throw new Error('No se pudo guardar en Supabase: ' + error.message);
            }
            if (!updatedUser) {
                throw new Error('No se encontró el usuario para guardar los datos.');
            }
        } catch (error) {
            throw new Error('Error al guardar datos de usuario: ' + (error.message || error));
        }

        return { ok: true };
    }

    async getUserData(user) {
        this.ensureSupabase();
        const username = (user || '').trim().toLowerCase();
        if (!username || !this.supabase) {
            throw new Error('Supabase no disponible.');
        }
        const { data, error } = await this.supabase
            .from('users')
            .select('save_data')
            .eq('username', username)
            .maybeSingle();
        if (error) throw error;
        return data?.save_data || {};
    }

    async getUsersWithFriend(username) {
        this.ensureSupabase();
        const normalized = String(username || '').trim().toLowerCase();
        if (!normalized || !this.supabase) throw new Error('Supabase no disponible.');
        const { data, error } = await this.supabase.from('users').select('username, save_data');
        if (error) throw error;
        return (data || []).filter(user => (Array.isArray(user.save_data?.amigos) ? user.save_data.amigos : [])
            .some(friend => String(friend.username).trim().toLowerCase() === normalized));
    }

    async getCooperativeProjectsForPartner(username) {
        this.ensureSupabase();
        const normalized = String(username || '').trim().toLowerCase();
        if (!normalized || !this.supabase) throw new Error('Supabase no disponible.');
        const { data, error } = await this.supabase.from('users').select('save_data');
        if (error) throw error;
        return (data || []).flatMap(user => [
            ...(Array.isArray(user.save_data?.cooperativeProjects) ? user.save_data.cooperativeProjects : []),
            ...(Array.isArray(user.save_data?.cooperativeRequests) ? user.save_data.cooperativeRequests : [])
        ]).filter(project => String(project.partner || '').trim().toLowerCase() === normalized
            && String(project.owner || '').trim().toLowerCase() !== normalized)
            .map(project => project.status === 'Aceptado'
                ? project
                : { ...project, status: 'Pendiente de respuesta' });
    }

    async getSocialUsers(identifier) {
        this.ensureSupabase();
        if (!this.supabase) throw new Error('Supabase no disponible.');
        const needle = String(identifier || '').trim().toLowerCase();
        if (!needle) return [];
        const idNeedle = /^\d+$/.test(needle) ? String(Number(needle)) : needle;
        const { data, error } = await this.supabase.from('users').select('username, created_at, save_data');
        if (error) throw error;
        const orderedUsers = [...(data || [])].sort((first, second) => {
            const firstTime = Date.parse(first.created_at || '') || 0;
            const secondTime = Date.parse(second.created_at || '') || 0;
            return firstTime - secondTime;
        });
        return orderedUsers.filter((user, index) => user.username !== this.token && (
            user.username.toLowerCase().includes(needle) || String(index + 1) === idNeedle
        )).slice(0, 10).map(user => ({
            username: user.username,
            publicId: String(orderedUsers.findIndex(item => item.username === user.username) + 1),
            nivel: Number(user.save_data?.nivel) || 1,
            xp: Number(user.save_data?.xp) || 0,
            reputacion: Number(user.save_data?.reputacion) || 50,
            ganancias: Number(user.save_data?.g) || 0,
            dividendos: Number(user.save_data?.div) || 0,
            plan: user.save_data?.plan || null,
            logros: Array.isArray(user.save_data?.logros) ? user.save_data.logros.length : 0,
            avatarSeleccionado: Number.isInteger(user.save_data?.avatarSeleccionado) ? user.save_data.avatarSeleccionado : 0,
            fotoPerfil: user.save_data?.fotoPerfil || ''
        }));
    }

    async getSocialProfile(username) {
        this.ensureSupabase();
        if (!this.supabase) throw new Error('Supabase no disponible.');
        const normalized = String(username || '').trim().toLowerCase();
        if (!normalized) throw new Error('Perfil inválido.');
        const { data: user, error } = await this.supabase.from('users')
            .select('username, save_data').eq('username', normalized).maybeSingle();
        if (error) throw error;
        if (!user) throw new Error('Perfil no encontrado.');
        const data = user.save_data || {};
        const sequentialPublicId = await this.getSequentialPublicId(user.username);
        return {
            username: user.username,
            publicId: sequentialPublicId || data.publicId || '',
            capital: Number(data.capital) || 0,
            nivel: Number(data.nivel) || 1,
            xp: Number(data.xp) || 0,
            reputacion: Number(data.reputacion) || 50,
            ganancias: Number(data.g) || 0,
            perdidas: Number(data.p) || 0,
            inversiones: Number(data.ti) || 0,
            sectores: Number(data.sectores) || 0,
            logros: Array.isArray(data.logros) ? data.logros.length : 0,
            plan: data.plan || null,
            avatarSeleccionado: Number.isInteger(data.avatarSeleccionado) ? data.avatarSeleccionado : 0,
            fotoPerfil: data.fotoPerfil || '',
            mascota: data.mascota || null
        };
    }

    async updateSocialData(username, updater) {
        const normalized = String(username || '').trim().toLowerCase();
        const { data: user, error: readError } = await this.supabase.from('users')
            .select('username, save_data').ilike('username', normalized).maybeSingle();
        if (readError || !user) throw readError || new Error('Usuario no encontrado');
        const saveData = updater(user.save_data || {});
        const { error } = await this.supabase.from('users').update({
            save_data: saveData, updated_at: new Date().toISOString()
        }).eq('username', user.username);
        if (error) throw error;
        return saveData;
    }

    async sendFriendRequest(targetUsername, fromUsername, fromPublicId) {
        const sender = String(fromUsername || '').trim().toLowerCase();
        const result = await this.updateSocialData(targetUsername, data => {
            const requests = Array.isArray(data.friendRequests) ? data.friendRequests : [];
            if (!requests.some(request => String(request.username).trim().toLowerCase() === sender)) {
                requests.push({ username: sender, publicId: fromPublicId, createdAt: new Date().toISOString() });
            }
            return { ...data, friendRequests: requests };
        });
        if (!result.friendRequests?.some(request => String(request.username).trim().toLowerCase() === sender)) {
            throw new Error('No se pudo guardar la solicitud en el perfil destinatario');
        }
        return result;
    }

    async getProfitRanking(limit = 50) {
        this.ensureSupabase();
        if (!this.supabase) throw new Error('Supabase no disponible.');
        const { data, error } = await this.supabase
            .from('users')
            .select('username, save_data');
        if (error) throw error;
        const rankingLimit = Math.max(1, Math.min(100, Number(limit) || 50));
        return (data || [])
            .map(user => {
                const ganancias = Number(user.save_data?.g) || 0;
                const dividendos = Number(user.save_data?.div) || 0;
                return { username: user.username, ganancias, dividendos, total: ganancias + dividendos };
            })
            .sort((a, b) => b.total - a.total)
            .slice(0, rankingLimit);
    }

    async verifyPassword(username, password) {
        const normalized = (username || '').trim().toLowerCase();
        if (!normalized || !password) {
            throw new Error('Usuario o contraseña inválidos');
        }
        this.ensureSupabase();

        if (!this.supabase) {
            throw new Error('Supabase no disponible. No se puede verificar la contraseña.');
        }

        const { data, error } = await this.supabase
            .from('users')
            .select('password_hash')
            .eq('username', normalized)
            .maybeSingle();

        if (error) {
            throw new Error('Error al verificar la contraseña');
        }
        if (!data) {
            throw new Error('Usuario no encontrado');
        }

        const passwordHash = await this.hashPassword(password);
        if (data.password_hash !== passwordHash) {
            throw new Error('Contraseña incorrecta');
        }

        return true;
    }

    async changeUsername(currentUsername, password, newUsername) {
        const username = (currentUsername || '').trim().toLowerCase();
        const normalizedNew = (newUsername || '').trim().toLowerCase();
        if (!username || !normalizedNew) {
            throw new Error('Completa usuario y nuevo nombre');
        }
        if (username === normalizedNew) {
            throw new Error('El nuevo nombre debe ser distinto al actual');
        }
        const canSkipPassword = this.token && this.token === username;
        if (!this.supabase) {
            throw new Error('Supabase no disponible. No se puede cambiar el nombre de usuario.');
        }

        if (!password && !canSkipPassword) {
            throw new Error('Se requiere contraseña para cambiar el nombre');
        }
        if (password) {
            await this.verifyPassword(username, password);
        }

        const { data: existingUser, error: checkError } = await this.supabase
            .from('users')
            .select('username')
            .eq('username', normalizedNew)
            .maybeSingle();

        if (checkError) {
            throw new Error('Error al verificar el nuevo nombre');
        }
        if (existingUser) {
            throw new Error('El nombre de usuario ya existe');
        }

        const { error } = await this.supabase
            .from('users')
            .update({ username: normalizedNew, updated_at: new Date().toISOString() })
            .eq('username', username);

        if (error) {
            throw new Error('No se pudo actualizar el nombre');
        }

        this.token = normalizedNew;
        sessionStorage.setItem('imperio_session_token', this.token);
        return { token: this.token };
    }

    async changePassword(username, currentPassword, newPassword) {
        this.ensureSupabase();
        const normalized = (username || '').trim().toLowerCase();
        if (!normalized || !currentPassword || !newPassword) {
            throw new Error('Completa la contraseña actual y la nueva');
        }
        if (!this.supabase) {
            throw new Error('Supabase no disponible. No se puede cambiar la contraseña.');
        }

        await this.verifyPassword(normalized, currentPassword);
        const newHash = await this.hashPassword(newPassword);
        const { error } = await this.supabase
            .from('users')
            .update({ password_hash: newHash, updated_at: new Date().toISOString() })
            .eq('username', normalized);

        if (error) {
            throw new Error('No se pudo cambiar la contraseña');
        }

        return { ok: true };
    }

    async deleteUser(username, password) {
        const normalized = (username || '').trim().toLowerCase();
        if (!normalized) {
            throw new Error('Usuario inválido para eliminar la cuenta');
        }

        if (!this.supabase) {
            throw new Error('Supabase no disponible. No se puede eliminar la cuenta.');
        }

        const { error } = await this.supabase
            .from('users')
            .delete()
            .eq('username', normalized);
        if (error) {
            throw new Error('No se pudo eliminar la cuenta');
        }

        if (this.token === normalized) {
            this.token = '';
            sessionStorage.removeItem('imperio_session_token');
        }
        return { ok: true };
    }

    async findUserByDestino(destino) {
        this.ensureSupabase();
        if (!this.supabase) {
            throw new Error('Supabase no disponible. No se puede buscar usuario.');
        }

        const username = (destino || '').trim().toLowerCase();
        if (!username) {
            return null;
        }

        const { data: userResult, error: userError } = await this.supabase
            .from('users')
            .select('username, save_data')
            .eq('username', username)
            .maybeSingle();

        if (userError) {
            throw new Error('Error al buscar usuario por nombre: ' + userError.message);
        }

        if (userResult && userResult.username) {
            return { username: userResult.username, data: userResult.save_data || {} };
        }

        const { data: allUsers, error: allError } = await this.supabase
            .from('users')
            .select('username, save_data');

        if (allError) {
            throw new Error('Error al buscar usuarios en Supabase: ' + allError.message);
        }

        const normalizedDestino = destino.replace(/\s+/g, '').toLowerCase();
        for (const item of allUsers || []) {
            const profileData = item.save_data || {};
            if (/^\d+$/.test(normalizedDestino) && String(profileData.publicId || '') === String(Number(normalizedDestino))) {
                return { username: item.username, data: profileData };
            }
            const tarjetaGlobal = profileData.tarjetaGlobal;
            if (tarjetaGlobal?.numero) {
                const cardNumber = String(tarjetaGlobal.numero).replace(/\s+/g, '').toLowerCase();
                if (cardNumber === normalizedDestino) {
                    return { username: item.username, data: profileData };
                }
            }
            if (!profileData.bancos) continue;
            for (const banco of profileData.bancos) {
                const tarjeta = banco.tarjeta;
                if (!tarjeta || !tarjeta.numero) continue;
                const cardNumber = String(tarjeta.numero).replace(/\s+/g, '').toLowerCase();
                if (cardNumber === normalizedDestino) {
                    return { username: item.username, data: profileData };
                }
            }
        }
        return null;
    }

    async request(path, payload) {
        if (path === '/api/change-username') {
            return this.changeUsername(this.token, payload.password, payload.newUsername);
        }
        if (path === '/api/change-password') {
            return this.changePassword(this.token, payload.currentPassword, payload.newPassword);
        }
        if (path === '/api/delete-account') {
            return this.deleteUser(this.token, payload.password);
        }
        throw new Error('Ruta desconocida: ' + path);
    }
}

const db = new BackendDB();
