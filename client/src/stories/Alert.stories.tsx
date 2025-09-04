import type { Meta, StoryObj } from '@storybook/react-vite';
import Alert from '@/components/reusable/Alert';

const meta = {
  title: 'Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  args: {
    message: 'Important Alert message',
    onClose: () => {},
    action: { name: 'Reset', handle: () => {} },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
export const LongMessage: Story = {
  args: {
    message:
      'Warning: You are about to perform an action that cannot be undone. ' +
      'Please ensure that you have saved all your work, closed all other applications that might be affected, ' +
      'and notified your team members if necessary. This action will permanently delete all associated data, ' +
      'including logs, backups, user settings, and cached files. Once confirmed, the system will start a sequence ' +
      'of irreversible operations that may take several minutes to complete. Ensure that your device remains powered ' +
      'on and connected to the network during this process. Proceed with extreme caution. If you are unsure, click "Cancel" ' +
      'and consult the documentation or system administrator before attempting this action again. Repeated warnings: ' +
      'this operation is final, irreversible, and may impact dependent services, scheduled tasks, and linked accounts. ' +
      'All responsible parties should be informed before continuing.',
    action: { name: 'Continue', handle: () => {} },
  },
};
export const NoAction: Story = {
  args: { action: undefined },
};
