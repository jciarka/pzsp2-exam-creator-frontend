import axios from 'axios';

export default { 
    baseURL: `https://${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}`,
}

const getPrivileges = async (subjectId) => {
    const result = await axios.get(`/api/participants/${subjectId}/myself`, {validateStatus: () => true})
    
    if (!result && result.status !== 200) {
        return {
            canWrite: false,
            canDelete: false,
            canAdmin: false,
        }
    }

    const canWrite = ( 
        (result.data.subjectRoles && result.data.subjectRoles.map(x => x.name).includes('WRITE')) || 
        (result.data.roles &&result.data.roles.map(x => x.name).includes('ADMIN'))
    )

    const canDelete = ( 
        (result.data.subjectRoles && result.data.subjectRoles.map(x => x.name).includes('DELETE')) || 
        (result.data.roles &&result.data.roles.map(x => x.name).includes('ADMIN'))
    )

    const canAdmin = ( 
        (result.data.subjectRoles && result.data.subjectRoles.map(x => x.name).includes('ADMIN')) || 
        (result.data.roles && result.data.roles.map(x => x.name).includes('ADMIN')) 
    )

    return { canWrite, canDelete, canAdmin }
}

export { getPrivileges };