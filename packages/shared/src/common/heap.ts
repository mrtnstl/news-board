/**
 * Max-heap based priority queue
 */
export interface PriorityQueueValue<T> {
    value: T;
    priority: number;
}

type Comparator<T> = (a: T, b: T) => number;

export class PriorityQueue<T> {
    private heap: PriorityQueueValue<T>[] = [];
    private compare: Comparator<PriorityQueueValue<T>> = (
        a: PriorityQueueValue<T>,
        b: PriorityQueueValue<T>,
    ) => a.priority - b.priority;

    constructor() {}

    private parent(i: number) {
        return Math.floor((i - 1) / 2);
    }
    private left(i: number) {
        return 2 * i + 1;
    }
    private right(i: number) {
        return 2 * i + 2;
    }
    private swap(i: number, j: number) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    private heapifyUp(i: number) {
        while (i > 0) {
            const parentIdx = this.parent(i);
            if (this.compare(this.heap[i], this.heap[parentIdx]) > 0) {
                this.swap(i, parentIdx);
                i = parentIdx;
            } else {
                break;
            }
        }
    }

    private heapifyDown(i: number) {
        while (true) {
            let largest = i;
            const left = this.left(i);
            const right = this.right(i);

            if (
                left < this.size() &&
                this.compare(this.heap[left], this.heap[largest]) > 0
            ) {
                largest = left;
            }
            if (
                right < this.size() &&
                this.compare(this.heap[right], this.heap[largest]) > 0
            ) {
                largest = right;
            }

            if (largest !== i) {
                this.swap(i, largest);
                i = largest;
            } else {
                break;
            }
        }
    }

    enqueue(item: PriorityQueueValue<T>) {
        this.heap.push(item);
        this.heapifyUp(this.heap.length - 1);
    }

    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }

        const max = this.heap[0];
        const last = this.heap.pop()!;

        if (!this.isEmpty()) {
            this.heap[0] = last;
            this.heapifyDown(0);
        }

        return max;
    }

    peek() {
        return this.heap[0];
    }

    isEmpty() {
        return this.size() === 0;
    }

    size() {
        return this.heap.length;
    }

    toArray() {
        return [...this.heap];
    }
}
