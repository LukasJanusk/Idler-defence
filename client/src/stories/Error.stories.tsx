import type { Meta, StoryObj } from '@storybook/react-vite';
import ErrorComponent from '@/components/reusable/ErrorComponent';

const meta = {
  title: 'Error',
  component: ErrorComponent,
  parameters: {
    layout: 'centered',
  },
  args: {
    label: 'Error!',
    message: 'Important Error message',
    onClose: () => {},
    action: { name: 'Return', handle: () => {} },
  },
} satisfies Meta<typeof ErrorComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
export const LongMessage: Story = {
  args: {
    action: { name: 'Handle this', handle: () => {} },
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
  },
};
export const NoAction: Story = {
  args: {
    action: undefined,
  },
};
