export const BoardBackground = () => {
    return <div className="boardBackground">
    <div
        className="blockDivider"
        style={{
            gridColumnStart: 2,
            gridColumnEnd: 2,
            gridRowStart: 1,
            gridRowEnd: 6,
        }}
    />
    <div
        className="blockDivider"
        style={{
            gridColumnStart: 4,
            gridColumnEnd: 4,
            gridRowStart: 1,
            gridRowEnd: 6,
        }}
    />
    <div
        className="blockDivider"
        style={{
            gridColumnStart: 1,
            gridColumnEnd: 6,
            gridRowStart: 4,
            gridRowEnd: 4,
        }}
    />
    <div
        className="blockDivider"
        style={{
            gridColumnStart: 1,
            gridColumnEnd: 6,
            gridRowStart: 2,
            gridRowEnd: 2,
        }}
    />
</div>
}