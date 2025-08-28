export const routes = {
  login: '/login',
  register: '/register',
  resetPassword: '/reset-password',
  forgotPassword: '/forgot-password',
  issues: {
    home: '/issues',
    create: '/issues/create',
    issueId: (id: string) => `/issues/${id}`,
    editIssue: (id: string) => `/issues/${id}/edit`,
  },
};
