import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  """
  A user in the Meeshkan Bank
  """
  type Client {
    id: ID!
    name: String!
    email: String!
    balanceInEuroCents: Int!
  }
  type Query {
    """
    A list of all clients. Only available to someone
    with root authentication.
    """
    clients: [Client!]!
    me: Client!
    root: Boolean!
  }
  type Mutation {
    """
    Allows one to authenticate as root.
    """
    authenticateAsRoot(
      """
      The root password.
      """
      password: String!
    ): Boolean!
    """
    Send money to a client.
    """
    sendMoney(
      """
      The id of the person we are sending money to.
      """
      who: ID!
      """
      The amount we are sending
      """
      amount: Int!
    ): Client!
    """
    Allows one to authenticate as a client.
    """
    authenticateAsClient(
      """
      The client's email.
      """
      email: String!
      """
      The client's password.
      """
      password: String!
    ): Client!
    """
    Add client.
    """
    addClient(
      """
      The client's email.
      """
      email: String!
      """
      The client's name.
      """
      name: String!
      """
      The client's password.
      """
      password: String!
      """
      The clients initial balance in euro cents
      """
      balanceInEuroCents: Int!
    ): Client!
    """
    Remove a client from the bank
    """
    removeClient(
      """
      The client's id
      """
      id: ID!
    ): Boolean!
    """
    Signs out of all authentication
    """
    signOut: Boolean!
  }
`;
