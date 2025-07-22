// クエリ作成
// 変数idを使って、特定のアニメの情報を取得するGraphQLクエリを作成します。

var query = `
query ($id: Int) {
  Media (id: $id){
    id
    title {
      romaji
    }
  }
}
`;

// Define our query variables and values that will be used in the query request
const variables = {
  id: 15125,
};

// Define the config we'll need for our Api request
const url = "https://graphql.anilist.co",
  options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  };

// Make the HTTP Api request
fetch(url, options).then(handleResponse).then(handleData).catch(handleError);

function handleResponse(response) {
  return response.json().then(function (json) {
    return response.ok ? json : Promise.reject(json);
  });
}

function handleData(data) {
  console.log(JSON.stringify(data, null, 2));
}

function handleError(error) {
  alert("Error, check console");
  console.error(error);
}
