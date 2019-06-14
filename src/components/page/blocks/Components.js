import TextBlock from './TextBlock'
import ImageBlock from './ImageBlock'
import RichTextBlock from './RichTextBlock'

export const Types = {
    'TextBlock': TextBlock,
    'ImageBlock': ImageBlock,
    'RichTextBlock': RichTextBlock
}

export default {
    'Text': {
        'TextBlock': {
            'constructor': Types['TextBlock'],
            'name': 'text',
            'label': 'TextBox',
            'props': [
                'bold-btn',
                'italic-btn',
                'underline-btn',
                'text-size-btn',
                'text-color-btn'
            ]
        },
        'RichTextBlock': {
            'constructor': Types['RichTextBlock'],
            'name': 'rich-text',
            'label': 'RichTextBox',
            'props': []
        }
    },
    'Media': {
        'ImageBlock': {
            'constructor': Types['ImageBlock'],
            'name': 'image',
            'label': 'Image',
            'props': []
        }
    }
}
