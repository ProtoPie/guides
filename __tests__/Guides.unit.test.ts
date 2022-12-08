import Guides from '../src/react-guides/Guides';
import { GuidesProps } from '../src/react-guides/types';

// Guides
describe('Guides', () => {
    it('should be defined', () => {
        const guide = new Guides({} as Required<GuidesProps>);
        expect(guide).toBeDefined();
    });
});
