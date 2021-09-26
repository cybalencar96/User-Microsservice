//Minha entidade
export default function buildMakeUser({ Id }) {
    return function makeUser ({
        _id =  Id.makeId(),
        credentials = {},
        learning = [],
        teaching = [],
        createdAt = Date.now(),

    }) {
        if (!Id.isValidId(_id)) {
            throw new Error('User must have valid id');
        }
        if (!credentials || !credentials.public || !credentials.private) {
            throw new Error('User must have public and private credentials');
        } 
        
        if (!credentials.public.name || !credentials.public.email || !credentials.public.phone || !credentials.public.profileImg) {
            throw new Error('User public credentials must have "name", "email", "phone" and "profileImg" attributes');
        }

        if (credentials.public.name.length < 3) {
            throw new Error('User name must have more than 2 characteres');
        }

        const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i
        if (emailRegex.test(credentials.public.email)) {
            throw new Error('Invalid user email');
        }

        if (credentials.public.phone.length < 6) {
            throw new Error('Invalid phone number.');
        }

        const imageUrlRegex = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/
        if (!imageUrlRegex.test(credentials.public.profileImg)) {
            throw new Error('Invalid url image');
        }

        if (credentials.private.username.length < 6) {
            throw new Error('Username must have more than 5 characteres');
        }

        if (credentials.private.password.length < 5) {
            throw new Error('Username must have more than 4 characteres');
        }

        if (learning.length > 0) {
            learning.forEach((classId,index) => {
                if (!Id.isValidId(classId)) {
                    throw new Error(`Class inside learning array, index ${index}, must have valid Id`);
                }
            })
        }
        
        if (teaching.length > 0) {
            teaching.forEach((classId,index) => {
                if (!Id.isValidId(classId)) {
                    throw new Error(`Class inside teaching array, index ${index}, must have valid Id`);
                }
            })
        }

        return Object.freeze({
            getId: () => _id,
            getCredentials: () => credentials,
            getLearning: () => learning,
            getTeaching: () => teaching,
            getCreatedAt: () => createdAt,
        })
    }
}