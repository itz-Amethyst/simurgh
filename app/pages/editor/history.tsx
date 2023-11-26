import { createStore, produce } from 'solid-js/store'
import './style/history.scss'
import { ChevronLeft, ChevronRight, Redo, Trash, Undo } from '!/icons/editor'
import { deep_equal } from '!/shared'

type History = {
    blocks: string
    timestamp: number
}

type State = {
    collapsed: boolean
    trashing: boolean
    history: History[]
    index: number
    current: History | null
}

const [state, setState] = createStore<State>({
    collapsed: false,
    trashing: false,
    history: [],
    index: -1,
    get current() {
        return this.history[this.index] || null
    },
})

function trash() {
    setState(s => {
        if (s.trashing) {
            return { index: -1, history: [], trashing: false }
        }

        setTimeout(() => {
            setState(s => {
                if (s.trashing) {
                    return { trashing: false }
                }
                return null
            })
        }, 3000)

        return { trashing: true }
    })
}

function addHistory(blocks: string) {
    setState(
        produce(s => {
            if (s.index > 0) {
                s.history = s.history.slice(s.index)
            }

            let old_history = s.history.at(0)
            if (old_history && old_history.blocks == blocks) return

            s.history.unshift({
                blocks,
                timestamp: new Date().getTime(),
            })

            if (s.history.length > 100) {
                s.history.pop()
            }
        })
    )
}

export { addHistory }
export default () => {
    return (
        <div class='leftside' classList={{ collapsed: state.collapsed }}>
            <button
                class='collapse-btn'
                onclick={() => setState(s => ({ collapsed: !s.collapsed }))}
            >
                {state.collapsed ? <ChevronRight /> : <ChevronLeft />}
            </button>

            <div class='inner'>
                <div class='actions'>
                    <button style={{ 'border-right-width': '2px' }}>
                        <Undo />
                    </button>
                    <button
                        class='trash'
                        classList={{ active: state.trashing }}
                        oncontextmenu={e => {
                            e.preventDefault()
                            if (state.trashing) setState({ trashing: false })
                        }}
                        onclick={trash}
                    >
                        <Trash />
                    </button>
                    <button style={{ 'border-left-width': '2px' }}>
                        <Redo />
                    </button>
                </div>
                <ul class='list'>
                    {state.history.map(h => (
                        <li>{h.timestamp}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
