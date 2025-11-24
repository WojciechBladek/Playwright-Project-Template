import * as fs from 'fs';
import { glob } from 'glob';

async function globalSetup(): Promise<void> {
  const storageDataFiles = await glob('tmp/*.json');
  storageDataFiles.forEach((file) => {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }
  });
}

export default globalSetup;
