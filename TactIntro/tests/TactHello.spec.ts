import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { toNano } from 'ton-core';
import { TactHello } from '../wrappers/TactHello';
import '@ton-community/test-utils';

describe('TactHello', () => {
    let blockchain: Blockchain;
    let tactHello: SandboxContract<TactHello>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        tactHello = blockchain.openContract(await TactHello.fromInit());

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await tactHello.send(
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
            to: tactHello.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and tactHello are ready to use
    });
});
