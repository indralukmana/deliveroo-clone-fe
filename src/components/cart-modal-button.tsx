import { Backdrop, Fade, IconButton, Modal, Paper } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { AddCircle, RemoveCircle } from '@material-ui/icons';
import React, { useState } from 'react';
import tw from 'twin.macro';
import { useCart, ActionType } from 'src/Context/Cart';

const CartModalButton = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const { cart, cartDispatch } = useCart();

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleOpen = (): void => {
    setOpen(true);
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <ShoppingCartIcon color="action" />
      </IconButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        css={[tw`flex justify-center items-center`]}
      >
        <Fade in={open}>
          <Paper css={[tw`p-5`]}>
            <h2 id="transition-modal-title">Cart</h2>
            {cart.dishOrders.map((dish) => (
              <div css={[tw`flex justify-between items-center`]}>
                <span>{dish.name}</span>
                <div>
                  <IconButton
                    onClick={(): void =>
                      cartDispatch({ type: ActionType.AddToCart, payload: dish })
                    }
                  >
                    <AddCircle />
                  </IconButton>
                  <span>{dish.count}</span>
                  <IconButton
                    onClick={(): void =>
                      cartDispatch({ type: ActionType.RemoveFromCart, payload: dish })
                    }
                  >
                    <RemoveCircle />
                  </IconButton>
                </div>
              </div>
            ))}
          </Paper>
        </Fade>
      </Modal>
    </>
  );
};

export default CartModalButton;
