# dynamodb-ts
ts dynamo client :3

## Usage:

### Define your schema

```ts
import { DynamoDB } from 'aws-sdk'
import { dynamoTs } from 'dynamodb-ts'

const {
  model,
  table,
  client: docClient,
  query,
} = dynamoTs({
  TableName: 'my-table',
  dynamo: {
    DynamoDB: new DynamoDB({
      endpoint: 'http://localhost:8000',
      region: 'us-east-1',
    }),
    DocumentClient: new DynamoDB.DocumentClient({
      endpoint: 'http://localhost:8000',
      region: 'us-east-1',
    }),
  },
  schema: {
    models: {
      user: {
        pk: { type: z.string(), value: () => 'user:' },
        sk: { type: z.string(), value: ({ userID }: { userID: string }) => userID },
        userID: { type: z.string(), generate: 'cuid' },
        username: { type: z.string(), required: true },
        name: { type: z.string(), required: true },
        profilePicture: { type: z.string(), required: true },
      },
      post: {
        pk: { type: z.string(), value: () => 'post:' },
        sk: { type: z.string(), value: ({ postID }: { postID: string }) => postID },
        postID: { type: z.string(), generate: 'cuid' },
        userID: { type: z.string(), required: true },
        content: { type: z.string(), required: true },
        createdAt: { type: z.string().datetime(), required: true },
      },
    },
    globalIndexes: [{ hashKey: 'userID', rangeKey: 'pk', name: 'userID' }],
  },
})
```

### Create / Delete Table

```ts
await table().createTable()
await table().deleteTable()
```

### Create Items

```ts
// create one
const user = await model('user').create({
  profilePicture: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/76.jpg',
  name: 'nicole',
  username: 'nicolesmileyface',
})

// create many
const posts = await model('post').createMany(
  Array.from({ length: 10 }).map(() => ({
    userID: user.userID,
    content: 'lorem ipsum sit dolor',
    createdAt: new Date().toISOString(),
  }))
)
```

### Query Models

```ts
const postsQuery = await model('post').query({
  beginsWith: 'clf',
})
```

### Get Model

```ts
const getPost = await model('post').get({
  sk: 'clf8aja1j0001ango2ack7aox'
})
```

### Delete Model

```ts
const getPost = await model('post').delete({
  sk: 'clf8aja1j0001ango2ack7aox'
})
```

### Query Index

```ts
const postsByUser = await query({
  indexName: 'userID',
  pk: {
    keyName: 'userID',
    value: user.userID,
  },
  sk: {
    keyName: 'pk',
    conditions: {
      '=': 'post:',
    },
  },
})
```