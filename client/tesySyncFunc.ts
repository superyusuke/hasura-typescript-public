function userSyncRule(user, context, callback) {
  const userId = user.user_id;
  const name = user.nickname;

  console.log(name, userId);

  const admin_secret = "yoursecretXXXXXX";
  const url = `http://hasura-domain/v1/graphql`;

  const mutation = `mutation ($userId: String!, $name: String!) {
  insert_users(objects: [{user_id: $userId, name: $name}]) {
    affected_rows
  }
}`;

  // @ts-ignore
  request.post(
    {
      headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret": admin_secret,
      },
      url: url,
      body: JSON.stringify({
        query: mutation,
        variables: { userId, name },
      }),
    },
    function (error, response, body) {
      console.log(body);
      callback(error, user, context);
    }
  );
}
