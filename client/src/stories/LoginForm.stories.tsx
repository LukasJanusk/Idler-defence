import type { Meta, StoryObj } from '@storybook/react-vite';
import LoginForm from '@/components/reusable/LoginForm';

const meta = {
  title: 'Login Form',
  component: LoginForm,
  parameters: {
    layout: 'centered',
  },
  args: {
    open: true,
    className: '',
    onSubmit: () => console.log('Form submited'),
    onClose: () => console.log('Form closed'),
  },
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: '',
  },
};
export const NoClose: Story = {
  args: {
    className: '',
    open: undefined,
  },
};
