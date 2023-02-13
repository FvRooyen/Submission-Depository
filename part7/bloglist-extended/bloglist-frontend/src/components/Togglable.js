import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button, Container } from 'react-bootstrap'
import { ArrowDownCircle, XCircle } from 'react-bootstrap-icons'
const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <Container>
                <div style={hideWhenVisible}>
                    <Button
                        variant="secondary"
                        style={{ marginTop: 10 }}
                        onClick={toggleVisibility}
                    >
                        <ArrowDownCircle />
                        {props.buttonLabel}
                    </Button>
                </div>
                <div style={showWhenVisible} className="togglableContent">
                    {props.children}
                    <Button
                        variant="dark"
                        style={{ marginTop: 10 }}
                        onClick={toggleVisibility}
                    >
                        <XCircle />
                        Cancel
                    </Button>
                </div>
            </Container>
        </div>
    )
})

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'
export default Togglable
