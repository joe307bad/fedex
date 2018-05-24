using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace WebSocketOfDoom
{
    public class MapDefinitionHub : Hub
    {
        public void BroadcastMap(string name, object map)
        {
            Clients.All.SendAsync("broadcastMap", name, map);
        }

        public void Echo(string name, object map)
        {
            Clients.Client(Context.ConnectionId).SendAsync("echo", name, map + " (echo from server)");
        }
    }
}
