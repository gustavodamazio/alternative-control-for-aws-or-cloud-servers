import { CronJob } from 'cron';
import { format } from 'date-fns';
import { MachineController } from './app/controllers';

new CronJob(
    '0 */5 * * * *',
    () => {
        console.log(`CronJob => 5 in 5 minutes => ${format(new Date(), 'dd/MM/yyyy HH:mm:ss')}`);
        try {
            MachineController.createOrUpdateBatch();
        } catch (error) {
            console.error(error);
        }
    },
    null,
    true,
    'America/Los_Angeles'
).start(); // Trigger 5 in 5 minutes.
