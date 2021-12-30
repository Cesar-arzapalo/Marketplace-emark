import { CarroService } from '../../services/carro/carro.service';
import { Pedido } from './pedido.model';
export abstract class State {
    protected context!: Pedido;
    public setContext(context: Pedido) {
        this.context = context;
    }

    public abstract handle1(): void;

    public abstract handle2(): void;
}

/**
 * Concrete States implement various behaviors, associated with a state of the
 * Context.
 */
export class PedidoEnCompra extends State {
    public handle1(): void {
        this.context.transitionTo(new PedidoComprado());
    }

    public handle2(): void {
        console.log('Pedido En comrpa');
    }
}

export class PedidoComprado extends State {
    public handle1(): void {
        console.log('Pedido Comprado');
    }

    public handle2(): void {
        console.log('ConcreteStateB handles request2.');
        console.log('ConcreteStateB wants to change the state of the context.');
        this.context.transitionTo(new PedidoEnCompra());
    }
}