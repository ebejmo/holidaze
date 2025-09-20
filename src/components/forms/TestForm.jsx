import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormInput from '../ui/FormInput';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 chars').required(),
});

export default function TestForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    console.log('Form data:', data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        label="Email"
        name="email"
        type="email"
        register={register}
        errors={errors}
        required
      />

      <FormInput
        label="Password"
        name="password"
        type="password"
        register={register}
        errors={errors}
        required
      />

      <button type="submit" className="btn btn-primary w-100">
        Register
      </button>
    </form>
  );
}
