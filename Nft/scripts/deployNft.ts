import { toNano } from 'ton-core';
import { Nft } from '../wrappers/Nft';
import { NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const nft = provider.open(await Nft.fromInit());

    await nft.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(nft.address);

    // run methods on `nft`
}
