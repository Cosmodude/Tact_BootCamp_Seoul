import { toNano } from 'ton-core';
import { TactHello } from '../wrappers/TactHello';
import { NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const tactHello = provider.open(await TactHello.fromInit());

    await tactHello.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(tactHello.address);

    // run methods on `tactHello`
}
