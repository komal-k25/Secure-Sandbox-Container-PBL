// testVmIndexLogic.ts
const assert = require('assert');

function runTest() {
    console.log("Starting index extraction tests...");
    
    // Simulate what the DB returned
    const vmsFromDb = [
        { id: 10, container_id: "ssem-vm-u5-n0" },
        { id: 11, container_id: "ssem-vm-u5-n2" },
        { id: 12, container_id: "ssem-vm-u5-n1" } // Added out of order intentionally
    ];
    
    // Simulate what the stop/delete route does
    for (const vm of vmsFromDb) {
        const vmIndexMatch = vm.container_id ? vm.container_id.match(/-n(\d+)$/) : null;
        const vmIndex = vmIndexMatch ? parseInt(vmIndexMatch[1], 10) : 0;
        
        console.log(`VM ID ${vm.id} with container ${vm.container_id} -> Extracted Index: ${vmIndex}`);
        
        if (vm.id === 10) assert.strictEqual(vmIndex, 0);
        if (vm.id === 11) assert.strictEqual(vmIndex, 2);
        if (vm.id === 12) assert.strictEqual(vmIndex, 1);
    }
    
    console.log("✓ Stop/Delete extraction logic works.");
    
    // Simulate what the creation route does
    const usedIndexes = vmsFromDb.map((vm) => {
        const match = vm.container_id ? vm.container_id.match(/-n(\d+)$/) : null;
        return match ? parseInt(match[1], 10) : -1;
    });

    let availableIndex = 0;
    while (usedIndexes.includes(availableIndex)) {
        availableIndex++;
    }
    
    console.log(`Available Index when [0, 2, 1] are used: ${availableIndex}`);
    assert.strictEqual(availableIndex, 3);
    
    // What if index 1 was deleted?
    const vmsMissingOne = [
        { id: 10, container_id: "ssem-vm-u5-n0" },
        { id: 11, container_id: "ssem-vm-u5-n2" }
    ];
    
    const usedIndexesMissingOne = vmsMissingOne.map((vm) => {
        const match = vm.container_id ? vm.container_id.match(/-n(\d+)$/) : null;
        return match ? parseInt(match[1], 10) : -1;
    });

    let availableIndex2 = 0;
    while (usedIndexesMissingOne.includes(availableIndex2)) {
        availableIndex2++;
    }
    
    console.log(`Available Index when [0, 2] are used: ${availableIndex2}`);
    assert.strictEqual(availableIndex2, 1);
    
    console.log("✓ Available Index logic works.");
    console.log("All tests passed!");
}

runTest();
