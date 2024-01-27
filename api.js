import axios from 'axios';
import { useOrganizationStore } from './store/organization.js';

const axiosInstance = axios.create({
  baseURL: 'https://api.implifie.com/api/',
  timeout: 5000,
});

async function refreshAccessToken() {
  try {
    const refreshToken = localStorage.getItem('refresh');

    if (!refreshToken || refreshToken === 'undefined') {
      localStorage.removeItem("user");
      return null;
    }

    const response = await axiosInstance.post('auth/jwt/refresh/', {
      refresh: refreshToken,
    });

    localStorage.removeItem("token");
    localStorage.removeItem("refresh");

    localStorage.setItem("token", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);

    return response.data;
  } catch (error) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    return null;
  }
}

export const makeAuthenticatedRequest = async (endpoint, method, data) => {
  try {
    const accessToken = localStorage.getItem('token');

    if (!accessToken || accessToken === 'undefined') {
      const newToken = await refreshAccessToken();
      localStorage.setItem("token", newToken.access);
      localStorage.setItem("refresh", newToken.refresh);

      if (!newToken) {
        throw new Error('Failed to refresh token.');
      }

      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken.access}`;
    } else {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }

    const response = await axiosInstance.request({
      method,
      url: endpoint,
      data,
    });

    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      try {
        const newToken = await refreshAccessToken();
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken.access}`;
        console.log(newToken);

        const response = await axiosInstance.request({
          method,
          url: endpoint,
          data,
        });

        return response.data;
      } catch (error) {
        throw error
      }
    }

    console.error('API request error:', error);
    throw error; // Return the original error
  }
};

export const registerApi = async (name, email, phone, password) => {
  try {
    const response = await axiosInstance.post('auth/users/', {
      email,
      phone,
      fullname: name,
      password,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserApi = async () => {
  const response = await makeAuthenticatedRequest('user/', 'GET');

  return response;
};

export const putUserApi = async (fullname, phone, email) => {
  const requestData = {
    fullname,
    email,
    phone
  };
  const response = await makeAuthenticatedRequest('auth/users/me/', 'PUT', requestData);

  return response;
};

export const loginApi = async (email, password) => {
  try {
    const response = await axiosInstance.post('auth/jwt/create/', {
      email,
      password,
    });

    const loginResponse = response.data;

    localStorage.setItem("token", loginResponse.access);
    localStorage.setItem("refresh", loginResponse.refresh);

    const user = await getUserApi();
    localStorage.setItem("user", JSON.stringify(user));

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changePasswordApi = async (new_password, re_new_password, current_password) => {
  const requestData = {
    new_password,
    re_new_password,
    current_password
  };
  const response = await makeAuthenticatedRequest('auth/users/set_password/', 'POST', requestData);

  return response;
};

export const forgetPasswordApi = async (email) => {
  try {
    const response = await axiosInstance.post('auth/users/reset_password/', {
      email
    });

    if (response.status === 204) {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

export const getContactApi = async () => {
  const response = await makeAuthenticatedRequest('contacts/', 'GET');
  return response;
};


export const addContactApi = async (first_name, last_name, phone, email, source) => {
  const response = await makeAuthenticatedRequest('contacts/', 'POST', {
    first_name,
    last_name,
    phone,
    email,
    lastmessageDate,
    source,
    lastmessageTime
  
    
  });  
  return response;
}

export const getChatContactsApi = async (last_message_status) => {
  const organization = await useOrganizationStore().getOrganization;
  const response = await makeAuthenticatedRequest(`contacts/?org_id=${organization.id}&last_message=${last_message_status}`, 'GET');
  console.log("getChatContactsApi response :: ", response);
  return response;
};

export const getActiveChatContactsApi = async (chat_status) => {
  const organization = await useOrganizationStore().getOrganization;
  const response = await makeAuthenticatedRequest(`contacts/?org_id=${organization.id}&chat_status=${chat_status}`, 'GET');
  console.log("getChatContactsApi response :: ", response);
  return response;
};

export const getChatMessageApi = async (contact_id) => {
  const organization = await useOrganizationStore().getOrganization;
  const response = await makeAuthenticatedRequest(`messages/org_id/${organization.id}/contact/${contact_id}/`, 'GET');
  console.log("getChatMessageApi response :: ", response);
  return response;
};

export const getTemplatesApi = async () => {
  const organization = await useOrganizationStore().getOrganization;
  const response = await makeAuthenticatedRequest(`templates/?org_id=${organization.id}`, 'GET');
  // console.log("getTemplatesApi response :: ", response);
  return response;
};

export const addTemplateApi = async (data) => {
  const organization = await useOrganizationStore().getOrganization;
  const requestData = {
    organization: organization.id,
    name: data.name,
    category: data.category,
    language: data.language,
    header_type: data.header_type,
    header_text: data.header_text,
    header_media: data.header_media,
    body: data.body,
    footer: data.footer,
    button: data.button,
  };
  const response = await makeAuthenticatedRequest('templates/', 'POST', requestData);

  return response;
}

export const getTemplateLibraryApi = async () => {
  const response = await makeAuthenticatedRequest('templatelibrary/', 'GET');

  return response;
};

export const getOrganizationApi = async () => {
  const response = await makeAuthenticatedRequest('org/', 'GET');

  return response;
};

export const addOrganizationApi = async (name, logo, description, industry, email, website, meta_token) => {
  const requestData = {
    name,
    logo,
    description,
    industry,
    email,
    website,
    meta_token,
  };
  const response = await makeAuthenticatedRequest('org/', 'POST', requestData);
  
  return response;
}

export const putOrganizationApi = async (id, name, logo, description, industry, email, website, meta_token, waba_id, permanent_token,meta_login_code) => {
  const requestData = {
    name,
    logo,
    description,
    industry,
    email,
    website,
    meta_token,
    waba_id,
    permanent_token,
    meta_login_code
  };
  const response = await makeAuthenticatedRequest(`org/${id}/`, 'PUT', requestData);
  // console.log("putOrganizationApi response :: ", response);
  return response;
}

export const getNumbersApi = async () => {
  const organization = await useOrganizationStore().getOrganization;
  const response = await makeAuthenticatedRequest(`numbers/?org_id=${organization.id}`, 'GET');
  console.log("getNumbersApi :: ", response);
  return response;
}

export const getContactGroupApi = async () => {
  const response = await makeAuthenticatedRequest('contactgroups/', 'GET');
  console.log("getContactGroupApi :: ", response);
  return response;
}

export const addContactGroupApi = async (name) => {
  const requestData = {
    name
  };
  const response = await makeAuthenticatedRequest('contactgroups/', 'POST', requestData);
  console.log("addContactGroupApi :: ", response);
  return response;
}

export const patchContactGroupApi = async (contacts) => {
  const requestData = {
    contacts // expecting array here
  };
  const response = await makeAuthenticatedRequest('contactgroups/', 'PATCH', requestData);
  console.log("patchContactGroupApi :: ", response);
  return response;
} 

export const updateContactApi = async (id, first_name, last_name, email, phone) => {
  const requestData = {
      id,
     first_name,
     last_name,
     email,
     phone
    
  };

  const response = await makeAuthenticatedRequest(`contacts/${id}/`, 'PATCH', requestData);
  console.log("updateContactApi :: ", response);
  return response;
}
