import { UserDocument } from '../models/User';

export default {
    render(user: UserDocument) {
        const { id, email, name } = user;
        return { id, email, name };
    }
};
