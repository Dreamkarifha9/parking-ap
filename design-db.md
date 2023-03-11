# table - parking-lot พื้นที่จอดรถ

    id number
    name ชื่อบริษัทหรือสถานที่
    number_of_blocks number จำนวน ช่อง ภายในชั้นมีกี่ช่อง
    active boolean
    deleted boolean
    createdAt DateTime
    createdBy varchar
    updatedAt DateTime
    updatedBy varchar

# table block

    id number PK
    parking_lot_id number FK
    block_code varchar ชื่อช่อง A1,A2,B1,B2,C1,C2
    block_size enum smaill,medium,large
    is_block_full สถานะว่างหรือไม่ของ block
    active boolean
    deleted boolean
    createdAt DateTime
    createdBy varchar
    updatedAt DateTime
    updatedBy varchar

# table floor

    id number PK
    block_id FK
    floor_number number ชั้นที่เท่าไหร
    number_of_slots number เก็บช่องที่มีอยู่บนชั้น
    is_floor_full สถานะไม่ว่างของชั้น
    active boolean
    deleted boolean
    createdAt DateTime
    createdBy varchar
    updatedAt DateTime
    updatedBy varchar

# table slot

    id number PK
    floor_id FK
    slot_number หมายเลขช่อง
    is_slot_available char 1 สถานะ
    active boolean
    deleted boolean
    createdAt DateTime
    createdBy varchar
    updatedAt DateTime
    updatedBy varchar

# table - parking_slot_reservation การจองพื้นที่จอดรถ

    id uuid PK
    parking_slot_id number FK
    start_timestamp dateTIme
    actual exit time DateTime
    duration_in_minutes number
    booking_date date
    numberPlate text
    carSize enum smaill,medium,large
    active boolean
    deleted boolean
    createdAt DateTime
    createdBy varchar
    updatedAt DateTime
    updatedBy varchar
