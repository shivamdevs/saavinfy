import * as User from "./user";

const Schema = {
    $raw: {
        ...User,
    },
    User: User.UserSchema,
};

export default Schema;
