import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { toNano } from 'ton-core';
import { Nft } from '../wrappers/Nft';
import '@ton-community/test-utils';

describe('Nft', () => {
    let blockchain: Blockchain;
    let nft: SandboxContract<Nft>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        nft = blockchain.openContract(await Nft.fromInit());

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await nft.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: nft.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and nft are ready to use
    });
});
