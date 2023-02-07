import { useLayoutStore } from '@/stores/LayoutStore';
import { useAuthStore } from '@/stores/AuthStore';

const authCheck = async (apiException) => {
  const layoutStore = useLayoutStore();
  const authStore = useAuthStore();

  if (authStore.isLoggedIn === true &&
    apiException && apiException.code === 401
  ) {
    await authStore.logout();

    layoutStore.setStatusMsg({
      type: 'info',
      text: ['Your login has expired. Please login again']
    });

    return false;
  }
  return true;
}

const setErrorStatusMsg = async (error) => {
  const exceptionType = error.constructor.name;
  let errorMsgs = [];

  console.log('error!!!', error);

  if (exceptionType === 'ValidationException') {
    const messages = await error.messages;

    console.log('error!!! 2', messages);

    errorMsgs = messages;
  } else {
    errorMsgs = [error.message];
  }

  const layoutStore = useLayoutStore();
  layoutStore.setStatusMsg({
    type: 'error',
    text: errorMsgs
  });
}

export const callApi = async (ftn) => {
  let result = null;
  
  try {
    result = await ftn();
  } catch (error) {
    const exceptionType = error.constructor.name;
    let isAuthValid = true;

    if (exceptionType === 'ApiException') {
      isAuthValid = authCheck(error);
    }

    if (isAuthValid === true) {
      setErrorStatusMsg(error);
      //throw error;
      return false;
    }
  }

  return result;
}
