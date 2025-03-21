const checkUserPermission = (project, userId) => {
  const userAdminPermission =
    project.admins.some((member) => member._id === userId) || project.owner._id === userId;
  const userOwnerPermission = project.owner._id === userId;

  return { userAdminPermission, userOwnerPermission };
};

export default checkUserPermission;
