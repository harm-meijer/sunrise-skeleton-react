import { gql } from '@apollo/client';
import { apolloClient } from '../../apollo';
import useMyOrder from '../useMyOrder';
import useMyOrders from '../useMyOrders';
export const loginVars = (email, password) => ({
  draft: {
    email,
    password,
  },
});
const createResetToken = (email) =>
  apolloClient.mutate({
    mutation: gql`
      mutation createResetToken($email: String!) {
        customerCreatePasswordResetToken(email: $email) {
          value
        }
      }
    `,
    variables: {
      email,
    },
  });
const returnItems = (id, version, items) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation returnItems(
        $id: String
        $version: Long!
        $items: [ReturnItemDraftType!]!
      ) {
        updateOrder(
          version: $version
          id: $id
          actions: { addReturnInfo: { items: $items } }
        ) {
          orderNumber
        }
      }
    `,
    variables: {
      id,
      version,
      items: items.map((item) => ({
        ...item,
        shipmentState: 'Returned',
      })),
    },
  });
};
const resetPassword = ({ token, newPassword }) =>
  apolloClient.mutate({
    mutation: gql`
      mutation resetPassword(
        $tokenValue: String!
        $newPassword: String!
      ) {
        customerResetPassword(
          tokenValue: $tokenValue
          newPassword: $newPassword
        ) {
          firstName
        }
      }
    `,
    variables: {
      tokenValue: token,
      newPassword,
    },
  });
const signup = (form) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation customerSignMeUp(
        $draft: CustomerSignMeUpDraft!
      ) {
        customerSignMeUp(draft: $draft) {
          customer {
            customerId: id
            firstName
            lastName
            email
            version
            customerNumber
            customerGroupRef {
              customerGroupId: id
            }
          }
        }
      }
    `,
    variables: {
      draft: {
        email: form.email,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName,
      },
    },
  });
};
const updateUser = ({
  version,
  firstName,
  lastName,
  email,
}) =>
  apolloClient.mutate({
    mutation: gql`
      mutation updateMyCustomer(
        $actions: [MyCustomerUpdateAction!]!
        $version: Long!
      ) {
        updateMyCustomer(
          version: $version
          actions: $actions
        ) {
          customerId: id
          version
          email
          firstName
          lastName
          version
          customerGroupRef {
            customerGroupId: id
          }
        }
      }
    `,
    variables: {
      version,
      actions: [
        { changeEmail: { email } },
        { setFirstName: { firstName } },
        { setLastName: { lastName } },
      ],
    },
  });
const login = (email, password) =>
  apolloClient.mutate({
    mutation: gql`
      mutation customerSignMeIn(
        $draft: CustomerSignMeInDraft!
      ) {
        customerSignMeIn(draft: $draft) {
          customer {
            customerId: id
            firstName
            lastName
            email
            customerNumber
            version
            customerGroupRef {
              customerGroupId: id
            }
          }
        }
      }
    `,
    variables: loginVars(email, password),
  });
const updateMyCustomerPassword = ({
  currentPassword,
  newPassword,
  version,
}) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation changePassword(
        $version: Long!
        $currentPassword: String!
        $newPassword: String!
      ) {
        customerChangeMyPassword(
          version: $version
          currentPassword: $currentPassword
          newPassword: $newPassword
        ) {
          customerId: id
          firstName
          lastName
          email
          customerNumber
          version
          customerGroupRef {
            customerGroupId: id
          }
        }
      }
    `,
    variables: {
      version,
      currentPassword,
      newPassword,
    },
  });
};

export default {
  signup,
  updateUser,
  createResetToken,
  resetPassword,
  useMyOrders,
  useMyOrder,
  returnItems,
  updateMyCustomerPassword,
  login,
};
