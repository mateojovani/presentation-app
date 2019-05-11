import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import { renderBlock } from './Block'

describe('block renders', () => {
    it('renders basic block', () => {
        shallow(renderBlock('edit', {}, () => null, () => null))
    })

    it('renders drag&drop block', () => {
        const tree = renderer
            .create(renderBlock('edit', {}, () => null, () => null))
            .toJSON()

        expect(tree).toMatchSnapshot()
    })
})
