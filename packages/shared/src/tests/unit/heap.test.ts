import { PriorityQueue } from "../../common/heap.js";

describe("PriorityQueue", () => {
    it("should return a valid instance", () => {
        const queue = new PriorityQueue<string>();

        expect(queue).toBeInstanceOf(PriorityQueue);
        expect(queue).toHaveProperty("heap");
        expect(queue).toHaveProperty("compare");
        expect(queue).toHaveProperty("parent");
        expect(queue).toHaveProperty("left");
        expect(queue).toHaveProperty("right");
        expect(queue).toHaveProperty("swap");
        expect(queue).toHaveProperty("heapifyUp");
        expect(queue).toHaveProperty("heapifyDown");
        expect(queue).toHaveProperty("enqueue");
        expect(queue).toHaveProperty("dequeue");
        expect(queue).toHaveProperty("peek");
        expect(queue).toHaveProperty("isEmpty");
        expect(queue).toHaveProperty("size");
        expect(queue).toHaveProperty("toArray");
    });

    it("should always return the next item with the largest priority", () => {
        const first = { value: "first", priority: 99999 };
        const second = { value: "second", priority: 342 };
        const third = { value: "third", priority: 6 };
        const fourth = { value: "fourth", priority: -3 };

        const queue = new PriorityQueue<string>();
        queue.enqueue(third);
        queue.enqueue(first);
        queue.enqueue(second);
        queue.enqueue(fourth);

        const internal = queue.toArray();

        expect(internal[0]).toEqual(first);
        expect(queue.peek()).toEqual(first);
        expect(queue.isEmpty()).toBe(false);
        expect(queue.dequeue()).toEqual(first);
        expect(queue.dequeue()).toEqual(second);
        expect(queue.dequeue()).toBe(third);
        expect(queue.dequeue()).toBe(fourth);
        expect(queue.isEmpty()).toBe(true);
        expect(queue.dequeue()).toBe(undefined);
    });

    it("should return undefined, if queue is empty", () => {
        const queue = new PriorityQueue<string>();

        expect(queue.isEmpty()).toBe(true);
        expect(queue.dequeue()).toBe(undefined);
    });
});
