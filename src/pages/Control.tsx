
import React, { useState, useEffect } from 'react';
import { useCart, Order } from '../contexts/CartContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Clock, CheckCircle, XCircle, MapPin, Coffee, Package } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const Control: React.FC = () => {
  const { orders, updateOrderStatus } = useCart();
  const [rejectionReason, setRejectionReason] = useState<{ [key: string]: string }>({});
  const [timers, setTimers] = useState<{ [key: string]: number }>({});

  // Timer para cada pedido
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prevTimers => {
        const newTimers = { ...prevTimers };
        orders.forEach(order => {
          if (order.status === 'pending') {
            const elapsed = Math.floor((Date.now() - order.timestamp.getTime()) / 1000);
            newTimers[order.id] = elapsed;
          }
        });
        return newTimers;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [orders]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAcceptOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'accepted');
    toast({
      title: "Pedido aceito!",
      description: "O cliente foi notificado que o pedido está em preparo.",
    });
  };

  const handleRejectOrder = (orderId: string) => {
    const reason = rejectionReason[orderId];
    if (!reason?.trim()) {
      toast({
        title: "Motivo obrigatório",
        description: "Informe o motivo da recusa do pedido.",
        variant: "destructive",
      });
      return;
    }

    updateOrderStatus(orderId, 'rejected', reason);
    setRejectionReason(prev => ({ ...prev, [orderId]: '' }));
    toast({
      title: "Pedido recusado",
      description: "O cliente foi notificado sobre a recusa.",
    });
  };

  const pendingOrders = orders.filter(order => order.status === 'pending');
  const completedOrders = orders.filter(order => order.status !== 'pending');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 font-lato">
            Painel de Controle
          </h1>
          <p className="text-xl text-gray-600">
            Gerencie os pedidos da WITER LANCHES
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Package className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{pendingOrders.length}</div>
            <div className="text-gray-600">Pedidos Pendentes</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {orders.filter(o => o.status === 'accepted').length}
            </div>
            <div className="text-gray-600">Aceitos Hoje</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <XCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {orders.filter(o => o.status === 'rejected').length}
            </div>
            <div className="text-gray-600">Recusados</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Clock className="h-8 w-8 text-witer-red mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              R$ {orders.reduce((total, order) => total + order.total, 0).toFixed(2)}
            </div>
            <div className="text-gray-600">Total em Vendas</div>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Clock className="h-6 w-6 mr-2 text-witer-red" />
            Pedidos Pendentes ({pendingOrders.length})
          </h2>
          
          {pendingOrders.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-500 mb-2">Nenhum pedido pendente</h3>
              <p className="text-gray-400">Todos os pedidos foram processados!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pendingOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-witer-red">
                  {/* Order Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        Pedido #{order.id}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {order.timestamp.toLocaleString('pt-BR')}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-witer-red flex items-center">
                        <Clock className="h-5 w-5 mr-1" />
                        {formatTime(timers[order.id] || 0)}
                      </div>
                      <div className="text-sm text-gray-500">Tempo de espera</div>
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center mb-2">
                      {order.deliveryType === 'table' ? (
                        <Coffee className="h-5 w-5 text-witer-red mr-2" />
                      ) : (
                        <MapPin className="h-5 w-5 text-witer-red mr-2" />
                      )}
                      <span className="font-medium">
                        {order.deliveryType === 'table' 
                          ? `Mesa ${order.tableNumber}` 
                          : 'Entrega em casa'
                        }
                      </span>
                    </div>
                    {order.address && (
                      <p className="text-sm text-gray-600 ml-7">{order.address}</p>
                    )}
                  </div>

                  {/* Order Items */}
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Itens do Pedido:</h4>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span>{item.quantity}x {item.name}</span>
                          <span className="font-medium">R$ {(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span className="text-witer-red">R$ {order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rejection Reason Input */}
                  <div className="mb-4">
                    <Textarea
                      placeholder="Motivo da recusa (obrigatório para rejeitar)"
                      value={rejectionReason[order.id] || ''}
                      onChange={(e) => setRejectionReason(prev => ({ 
                        ...prev, 
                        [order.id]: e.target.value 
                      }))}
                      className="w-full"
                      rows={2}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Button
                      onClick={() => handleAcceptOrder(order.id)}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Aceitar Pedido
                    </Button>
                    <Button
                      onClick={() => handleRejectOrder(order.id)}
                      variant="destructive"
                      className="flex-1"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Recusar Pedido
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Completed Orders */}
        {completedOrders.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Histórico de Pedidos ({completedOrders.length})
            </h2>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pedido
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Horário
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Entrega
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {completedOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.timestamp.toLocaleString('pt-BR')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.deliveryType === 'table' 
                            ? `Mesa ${order.tableNumber}` 
                            : 'Entrega'
                          }
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          R$ {order.total.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            order.status === 'accepted' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {order.status === 'accepted' ? 'Aceito' : 'Recusado'}
                          </span>
                          {order.rejectionReason && (
                            <div className="text-xs text-red-600 mt-1">
                              {order.rejectionReason}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Control;
