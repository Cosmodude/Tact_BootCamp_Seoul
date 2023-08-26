import "@stdlib/deploy";
import "@stdlib/ownable";
import "./nft_item.tact";

contract NftCollection with Deployable, Ownable  {
    owner: Address;
    next_item_index: Int as uint32 =0;
    collection_content: String;

    init() {
        self.owner = sender();
        self.collection_content = "TACT Bootcamp NFT";
    }

    receive("Mint"){
        self.requireOwner(); 
        self.mint(sender());
    }
    
    fun mint(receiver: Address){
        require(self.next_item_index >= 0, "non-sequential NFTs");
        let nft_init: StateInit = self.getNftItemInit(self.next_item_index);
        send(SendParameters{
            to: contractAddress(nft_init),
            value: ctx.value,
            mode: SendIgnoreErrors,
            body: Transfer{
                queryId: 0,
                new_owner: receiver
            }.toCell(),
            code: nft_init.code,
            data: nft_init.data
        });
        
        self.next_item_index = self.next_item_index + 1;
    }

    get fun getNftItemInit(item_index: Int): StateInit {
        let b: StringBuilder = beginString();
        b.append("Item # ");
        b.append(item_index.toString());
        return initOf NftItem(self.owner, myAddress(), item_index, b);
    }
}
