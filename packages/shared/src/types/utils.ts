export type Override<T, NewT extends { [key in keyof T]?: NewT[key] }> = Omit<
    T,
    keyof NewT
> &
    NewT;
