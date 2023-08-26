import "@stdlib/deploy";

contract NftItem with Deployable {
    owner: Address;
    item_index: Int as uint32;
    collection_content: String;
    individual_content: String;
    init( 
        owner: Address,
        item_index: Int,
        collection_content: String,
        individual_content: String
    ) {
        self.owner = owner;
        self.item_index = item_index;
        self.collection_content = collection_content;
        self.individual_content = individual_content;
    }
}
