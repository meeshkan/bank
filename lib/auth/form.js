// https://github.com/vercel/next.js/blob/master/examples/api-routes-apollo-server-and-client-auth/lib/form.js

export const getErrorMessage = error => {
    if (error.graphQLErrors) {
        for (const graphQLError of error.graphQLErrors) {
            if (
                graphQLError.extensions &&
                graphQLError.extensions.code === 'BAD_USER_INPUT'
            ) {
                return graphQLError.message;
            }
        }
    }

    return error.message;
};
