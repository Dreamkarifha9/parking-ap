# table - parking-lot พื้นที่จอดรถ

    id number
    name ชื่อบริษัทหรือสถานที่
    numberOfBlocks number จำนวน ช่อง ภายในชั้นมีกี่ช่อง
    active boolean
    deleted boolean
    createdAt DateTime
    createdBy varchar
    updatedAt DateTime
    updatedBy varchar

# table blocks

    id number PK
    parkingLotId number FK
    blockCode varchar ชื่อช่อง A1,A2,B1,B2,C1,C2
    blockSize enum smaill,medium,large
    isBlockFull สถานะว่างหรือไม่ของ block
    active boolean
    deleted boolean
    createdAt DateTime
    createdBy varchar
    updatedAt DateTime
    updatedBy varchar

# table floors

    id number PK
    blockId FK
    floorNumber number ชั้นที่เท่าไหร
    numberOfSlots number เก็บช่องที่มีอยู่บนชั้น
    isFloorFull สถานะไม่ว่างของชั้น
    active boolean
    deleted boolean
    createdAt DateTime
    createdBy varchar
    updatedAt DateTime
    updatedBy varchar

# table slots

    id number PK
    floorId FK
    slotNumber หมายเลขช่อง
    isSlotAvailable char 1 สถานะ
    active boolean
    deleted boolean
    createdAt DateTime
    createdBy varchar
    updatedAt DateTime
    updatedBy varchar

# table - parking_slot_reservation การจองพื้นที่จอดรถ

    id uuid PK
    parkingSlotId number FK
    startTimestamp dateTIme
    actual exit time DateTime
    durationInMinutes number
    bookingDate date
    numberPlate text
    carSize enum smaill,medium,large
    active boolean
    deleted boolean
    createdAt DateTime
    createdBy varchar
    updatedAt DateTime
    updatedBy varchar
