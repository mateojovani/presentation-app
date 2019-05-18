import TextBlock from './TextBlock'
import ImageBlock from './ImageBlock'
// import RichTextBlock from './RichTextBlock'

export const Types = {
    'TextBlock': TextBlock,
    'ImageBlock': ImageBlock,
    'RichTextBlock': () => {}
}

export default {
    'Text': {
        'TextBlock': {
            'constructor': Types['TextBlock'],
            'name': 'text',
            'label': 'TextBox'
        },
        // 'RichTextBlock': {
        //     'constructor': Types['RichTextBlock'],
        //     'name': 'rich-text',
        //     'label': 'RichTextBox'
        // }
    },
    'Media': {
        'ImageBlock': {
            'constructor': Types['ImageBlock'],
            'name': 'image',
            'label': 'Image'
        }
    }
}
