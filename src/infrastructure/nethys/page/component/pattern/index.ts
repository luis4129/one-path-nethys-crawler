import { NethysObject } from "../../object";

type MatcherFunction = (node: ChildNode) => boolean;
type SetterFunction = (node: ChildNode, object: NethysObject) => ChildNode | null;
type SkipFunction = (node: ChildNode) => ChildNode | null;

export abstract class NethysComponent {
    constructor(
        protected matchers: Array<MatcherFunction>,
        protected setter?: SetterFunction,
        protected specificSkip?: SkipFunction
    ) { }

    isComponent(node: ChildNode): boolean {
        if (this.matchers.length <= 0) return false;


        return this.matchers.reduce((agg: boolean, matcher: MatcherFunction) => agg && matcher(node), true);
    }

    setComponentProperties(node: ChildNode, object: NethysObject): ChildNode | null {
        if (!this.setter)
            return node.nextSibling;

        const nextSibling = this.setter(node, object);

        if (nextSibling === node) {
            throw new Error("Component Setter didn't advance nodes");
        }

        return nextSibling;
    }

    skipComponent(node: ChildNode) {
        if (this.specificSkip)
            return this.specificSkip(node);

        return node.nextSibling;
    }
}