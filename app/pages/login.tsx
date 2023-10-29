import { CodeIcon, UserIcon } from '!/icon'
import { createStore, produce } from 'solid-js/store'
import './style/login.scss'

enum InputStatus {
    UNKNOWN,
    ERROR,
    VALID,
}

type State = {
    stage: 'email' | 'code'
    email: string
    code: string
    email_status: InputStatus
    code_status: InputStatus
    error_message: string
}

export default () => {
    const [state, setState] = createStore<State>({
        stage: 'email',
        email: '',
        code: '',
        email_status: InputStatus.UNKNOWN,
        code_status: InputStatus.UNKNOWN,
        error_message: '',
    })

    const validate_gmail = async (): Promise<boolean> => {
        return true
    }

    return (
        <div class='login-fnd'>
            {/* <div class='login'>
                <h1>Simurgh Login</h1>
                <Switch>
                    <Match when={state.stage == 'email'}>
                        <div class='row email'>
                            <label for='login_email_input'>Email: </label>
                            <input
                                classList={{
                                    valid:
                                        state.email_status == InputStatus.VALID,
                                    error:
                                        state.email_status == InputStatus.ERROR,
                                }}
                                id='login_email_input'
                                type='email'
                                placeholder='test@example.com'
                                maxlength={255}
                                onInput={e => {
                                    let v = e.currentTarget.value

                                    if (!v) {
                                        setState({
                                            email_status: InputStatus.UNKNOWN,
                                            email: '',
                                        })
                                        return
                                    }

                                    setState({
                                        email_status: check_email(v)
                                            ? InputStatus.VALID
                                            : InputStatus.ERROR,
                                        email: v,
                                    })
                                }}
                            />
                        </div>
                    </Match>
                    <Match when={state.stage == 'code'}>
                        <div class='row code'>
                            <label for='login_code_input'>Code: </label>
                            <input
                                classList={{
                                    valid:
                                        state.code_status == InputStatus.VALID,
                                    error:
                                        state.code_status == InputStatus.ERROR,
                                }}
                                id='login_code_input'
                                type='text'
                                placeholder='69420'
                                maxlength={5}
                                onInput={e => {
                                    setState({
                                        code: e.currentTarget.value,
                                    })
                                }}
                            />
                        </div>
                    </Match>
                </Switch>

                <div class='row btn'>
                    <button
                        disabled={
                            state.stage == 'email'
                                ? state.email_status != InputStatus.VALID
                                : state.code.length != 5
                        }
                        onClick={() => {
                            if (state.stage == 'email') {
                                httpx({
                                    url: '/api/verification/',
                                    method: 'POST',
                                    type: 'json',
                                    json: {
                                        email: state.email,
                                        action: 'login',
                                    },
                                    onLoad(x) {
                                        if (x.status == 200) {
                                            setState({
                                                code: '',
                                                stage: 'code',
                                            })
                                        } else {
                                            setState({
                                                email_status: InputStatus.ERROR,
                                            })
                                        }
                                    },
                                })
                            } else {
                                httpx({
                                    url: '/api/auth/login/',
                                    method: 'POST',
                                    type: 'json',
                                    json: {
                                        email: state.email,
                                        code: state.code,
                                    },
                                    onLoad(x) {
                                        if (x.status == 200) {
                                            setState({
                                                code: 'cool',
                                                stage: 'code',
                                            })
                                        } else {
                                            setState({
                                                code_status: InputStatus.ERROR,
                                            })
                                        }
                                    },
                                })
                            }
                        }}
                        onMouseEnter={e => {
                            const el = e.currentTarget
                            const { left, width } = el.getBoundingClientRect()

                            const bx = left + width

                            if (e.clientX - left < bx - e.clientX) {
                                el.style.setProperty('--left', '0')
                                el.style.setProperty('--right', 'unset')
                            } else {
                                el.style.setProperty('--left', 'unset')
                                el.style.setProperty('--right', '0')
                            }
                        }}
                    >
                        Send Code
                    </button>
                </div>
            </div> */}
            <div class='login-wrapper'>
                <aside class='logo-img'>
                    <img src='/static/image/logo.svg' />
                    {/*<object
                        data='/static/image/logo.svg'
                        type='image/svg+xml'
                    ></object>*/}
                </aside>
                <aside class='detail'>
                    <header class='section_title eng'>
                        {'Simurgh Login'.split('').map((word, index) => {
                            return (
                                <span
                                    style={{
                                        'animation-delay': `${index * 60}ms`,
                                    }}
                                >
                                    {word}
                                </span>
                            )
                        })}
                    </header>
                    <div class='inps'>
                        <div
                            class='inp rtl gmail'
                            classList={{
                                holder: state.email.length >= 1,
                                active: state.stage === 'code',
                            }}
                        >
                            <span class='title_small'>
                                <div class='holder'>نام کاربری</div>
                                <div class='icon'>
                                    <UserIcon />
                                </div>
                            </span>
                            <input
                                type='text'
                                class='title_small'
                                onchange={e => {
                                    setState(
                                        produce(s => {
                                            s.email = e.target.value
                                        })
                                    )
                                }}
                            />
                        </div>
                        <div
                            class='inp rtl code'
                            classList={{
                                holder: state.code.length >= 1,
                                active: state.stage === 'code',
                            }}
                        >
                            <span class='title_small'>
                                <div class='holder'>کد ارسالی </div>
                                <div class='icon'>
                                    <CodeIcon />
                                </div>
                            </span>
                            <input
                                type='text'
                                class='title_small'
                                onchange={e => {
                                    setState(
                                        produce(s => {
                                            s.email = e.target.value
                                        })
                                    )
                                }}
                            />
                        </div>
                        <button
                            class='title_small basic-button'
                            onclick={() => {
                                if (state.stage === 'email') {
                                    if (validate_gmail())
                                        return setState(
                                            produce(s => {
                                                s.stage = 'code'
                                                s.email_status =
                                                    InputStatus.VALID
                                            })
                                        )
                                    else {
                                        return setState(
                                            produce(s => {
                                                s.email_status =
                                                    InputStatus.ERROR
                                                s.error_message =
                                                    'نام کاربری وارد شده نادرست است!'
                                            })
                                        )
                                    }
                                } else {
                                    // debug
                                    return
                                }
                            }}
                        >
                            ارسال کد
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    )
}
