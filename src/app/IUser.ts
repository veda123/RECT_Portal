export interface IUser{
    id          :   number,
    name        :   string,
    username    :   string,
    email       :   string,
    password    :   string,
    createdAt   :   string,
    updatedAt   :   string,
    roles       :  [ {
        id      :   string,
        name    :   string
    }]
}