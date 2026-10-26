export const areas = [
    {value: "building-b", label: "Building B", floors: [
        {floorName: "Floor 1", areaDescription: "", totalSeats: 10},
        {floorName: "Floor 2", areaDescription: "", totalSeats: 10},
    ]},

    {value: "building-d", label: "Building D", floors: [
        {floorName: "Floor 3", areaDescription: "Outside room D2", totalSeats: 20},
        {floorName: "Floor 4", areaDescription: "In the corridor outside the VIC studio", totalSeats: 16},
        {floorName: "Floor 5", areaDescription: "In the corridors outside the computer labs", totalSeats: 14},
    ]},

    {value: "building-e", label: "Building E", floors: [
        {floorName: "Floor 3", areaDescription: "Outside room E1", totalSeats: 25},
        {floorName: "Floor 4", areaDescription: "In the corridors outside the computer labs", totalSeats: 20},
        {floorName: "Floor 5", areaDescription: "In room E53", totalSeats: 38},
    ]},

    {value: "building-k", label: "Building K", floors: [
        {floorName: "Floor 3", areaDescription: "Outside room K1", totalSeats: 12},
    ]},

    {value: "building-m", label: "Building M", floors: [
        {floorName: "Floor 2", areaDescription: "", totalSeats: 88},
        {floorName: "Floor 3", areaDescription: "", totalSeats: 8},
    ]},

    {value: "building-q", label: "Building Q", floors: [
        {floorName: "Floor 1", areaDescription: "In room Q11", totalSeats: 30},
        {floorName: "Floor 2", areaDescription: "In B:228", totalSeats: 22},
        {floorName: "Floor 3", areaDescription: "In B:328", totalSeats: 18},
    ]},

    {value: "building-u", label: "Building U", floors: [
        {floorName: "Floor 2", areaDescription: "In U21 Break-out", totalSeats: 24},
        {floorName: "Floor 3", areaDescription: "In U31 Break-out", totalSeats: 16},
        {floorName: "Floor 4", areaDescription: "In U41 Break-out", totalSeats: 15},
        {floorName: "Floor 5", areaDescription: "In U51 Break-out", totalSeats: 24},
        {floorName: "Floor 6", areaDescription: "In U61 Break-out", totalSeats: 12},
        {floorName: "Floor 7", areaDescription: "In room 750", totalSeats: 12},
    ]},

    {value: "building-v", label: "Building V", floors: [
        {floorName: "Floor 3", areaDescription: "", totalSeats: 74},
        {floorName: "Floor 4", areaDescription: "", totalSeats: 4},
        {floorName: "Floor 5", areaDescription: "", totalSeats: 9},
    ]},

    {value: "building-w", label: "Building W", floors: [
        {floorName: "Floor 2", areaDescription: "In room 250", totalSeats: 16},
        {floorName: "Floor 3", areaDescription: "In ljusgården", totalSeats: 26},
        {floorName: "Floor 4", areaDescription: "In room W441", totalSeats: 7},
    ]},

    {value: "kth-biblioteket", label: "KTH Biblioteket", floors: [
        {floorName: "Floor 1", areaDescription: "", totalSeats: 85},
        {floorName: "Floor 2", areaDescription: "", totalSeats: 85},
        {floorName: "Floor 3", areaDescription: "", totalSeats: 85},
        {floorName: "Floor 4", areaDescription: "", totalSeats: 82},
    ]},

    {value: "nymble", label: "Nymble", floors: [
        {floorName: "Floor 1", areaDescription: "", totalSeats: 202},
        {floorName: "Floor 2", areaDescription: "", totalSeats: 202},
    ]},

    {value: "kth-innovation", label: "KTH Innovation", floors: [
        {floorName: "Floor 1", areaDescription: "In Arenan", totalSeats: 48},
    ]},

    {value: "teknikringen-14", label: "Teknikringen 14", floors: [
        {floorName: "Floor 3", areaDescription: "In hall Frodo", totalSeats: 10},
    ]}
];

export function getAreaLabel(value) {
    return areas.find(function (area) { return area.value === value; })?.label || "";
}

export function getAreaFloors(value) {
    return areas.find(function (area) {return area.value === value; })?.floors || [];
}

export function getBuildingByFloor(floorName) {
    const building = areas.find(area => 
        area.floors.some(floor => floor.floorName === floorName)
    );
    return building || null;
}