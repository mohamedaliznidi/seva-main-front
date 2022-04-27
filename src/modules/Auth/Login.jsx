import { useRef, useState } from 'react';
import { useForm } from '@mantine/hooks';
import { useAuthValue } from '../../main/store/userStore';
import { showNotification } from '@mantine/notifications';
import { Link } from 'react-router-dom';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Anchor,
  Center,
} from '@mantine/core';
import {
  GoogleButton,
  TwitterButton,
} from '../../library/components/SocialButtons/SocialButtons';

import { SignInScreen } from '../../main/store/firebase';

export default function Login() {
  return <SignInScreen />;
}

// export default function Login() {
//   const form = useForm({
//     initialValues: {
//       email: '',
//       password: '',
//     },

//     validationRules: {
//       email: (val) => /^\S+@\S+$/.test(val),
//       password: (val) => val.length >= 6,
//     },
//   });

//   const { login } = useAuthValue();
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   async function handleSubmit(e) {
//     // e.preventDefault();

//     try {
//       setError('');
//       setLoading(true);
//       console.log('hello');
//       await login(e.email, e.password);
//     } catch {
//       showNotification({
//         title: 'Default notification',
//         message: 'Hey there, your code is awesome! 🤥',
//       });
//     }

//     setLoading(false);
//   }

//   return (
//     <Center style={{ width: '100vw', height: '100vh' }}>
//       <Paper radius="md" p="xl" withBorder>
//         <Text size="lg" weight={500}>
//           Welcome to Seva, Login with
//         </Text>

//         <Group grow mb="md" mt="md">
//           <GoogleButton radius="xl">Google</GoogleButton>
//           <TwitterButton radius="xl">Twitter</TwitterButton>
//         </Group>

//         <Divider
//           label="Or continue with email"
//           labelPosition="center"
//           my="lg"
//         />

//         <form onSubmit={form.onSubmit(handleSubmit)}>
//           <Group direction="column" grow>
//             <TextInput
//               required
//               label="Email"
//               placeholder="hello@seva.dev"
//               value={form.values.email}
//               onChange={(event) =>
//                 form.setFieldValue('email', event.currentTarget.value)
//               }
//               error={form.errors.email && 'Invalid email'}
//             />

//             <PasswordInput
//               required
//               label="Password"
//               placeholder="Your password"
//               value={form.values.password}
//               onChange={(event) =>
//                 form.setFieldValue('password', event.currentTarget.value)
//               }
//               error={
//                 form.errors.password &&
//                 'Password should include at least 6 characters'
//               }
//             />
//           </Group>

//           <Group position="apart" mt="xl">
//             <Anchor component="button" type="button" color="gray" size="xs">
//               Forgot your password ?
//             </Anchor>
//             <Button type="submit">Login</Button>
//           </Group>
//         </form>
//       </Paper>
//     </Center>
//   );
// }

// import { useContext } from 'react';
// import { useForm } from '@mantine/hooks';
// import {
//   TextInput,
//   PasswordInput,
//   Text,
//   Paper,
//   Group,
//   Button,
//   Divider,
//   Anchor,
//   Center,
// } from '@mantine/core';
// import { useNavigate, useLocation } from 'react-router-dom';
// import {
//   signInWithEmailAndPassword,
//   sendEmailVerification,
// } from 'firebase/auth';
// import { auth } from '../../main/store/firebase';
// import {
//   GoogleButton,
//   TwitterButton,
// } from '../../library/components/SocialButtons/SocialButtons';

// function Login(props) {
//   let navigate = useNavigate();
//   const form = useForm({
//     initialValues: {
//       email: '',
//       name: '',
//       password: '',
//       terms: true,
//     },

//     validationRules: {
//       email: (val) => /^\S+@\S+$/.test(val),
//       password: (val) => val.length >= 6,
//     },
//   });

//   const location = useLocation();
//   return (
//     <Center
//       style={{ width: '100vw', height: '100vh' }}
//       sx={(theme) => ({
//         backgroundColor: theme.colors.gray[0],
//         '&:hover': {
//           backgroundColor: theme.colors.gray[1],
//         },
//       })}
//       //   style={{ width: '100vw', height: '100vh', background: theme.blue[4] }}
//     >
//       <Paper radius="md" p="xl" withBorder {...props}>
//         <Text size="lg" weight={500}>
//           Welcome to Seva
//         </Text>

//         <Group grow mb="md" mt="md">
//           <GoogleButton radius="xl">Google</GoogleButton>
//           <TwitterButton radius="xl">Twitter</TwitterButton>
//         </Group>

//         <Divider
//           label="Or continue with email"
//           labelPosition="center"
//           my="lg"
//         />

//         <form
//         // onSubmit={form.onSubmit(() => {
//         //   if (user.loggedIn) return;
//         //   setUser({ loggedIn: true });

//         //   if (location.state?.from) {
//         //     navigate(location.state.from);
//         //   }
//         //   navigate('/', { replace: true });
//         // })}
//         >
//           <Group direction="column" grow>
//             <TextInput
//               required
//               label="Email"
//               placeholder="hello@mantine.dev"
//               value={form.values.email}
//               onChange={(event) =>
//                 form.setFieldValue('email', event.currentTarget.value)
//               }
//               error={form.errors.email && 'Invalid email'}
//             />

//             <PasswordInput
//               required
//               label="Password"
//               placeholder="Your password"
//               value={form.values.password}
//               onChange={(event) =>
//                 form.setFieldValue('password', event.currentTarget.value)
//               }
//               error={
//                 form.errors.password &&
//                 'Password should include at least 6 characters'
//               }
//             />
//           </Group>

//           <Group position="apart" mt="xl">
//             <Anchor component="button" type="button" color="gray" size="xs">
//               Don't have an account? Register
//             </Anchor>
//             <Button type="submit">Login</Button>
//           </Group>
//         </form>
//       </Paper>
//     </Center>
//   );
// }

// export default Login;
