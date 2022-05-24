import { loggedInUser } from '../../data';
import Images from '../../theme/Images';

export default [
  {
    title: 'Change Password',
    info: '',
    route: 'ChangePassword',
  },
  {
    title: 'Notifications',
    info: '',
    route: 'NotificationSettings',
  },
  {
    title: 'Private Account',
    info: 'Only your followers will be able to see your posts',
    route: 'PrivateAccount',
  },
  {
    title: 'Blocked Users',
    info: '',
    route: 'BlockedUsers',
  },
  {
    title: 'Linked Account',
    info: '',
    route: 'LinkedAccounts',
  },
  {
    title: 'Terms And Conditions',
    info: '',
    route: 'TermsAndCondition',
  },
  {
    title: 'FAQs',
    info: '',
    route: 'FAQs',
  },
  {
    title: 'Privacy Policy',
    info: '',
    route: 'PrivacyPolicy',
  },
  // {
  //   title: 'Logout',
  //   info: loggedInUser.email,
  //   route: '',
  // },
];
