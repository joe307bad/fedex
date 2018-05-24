using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace WebSocketOfDoom
{
    public class MapDefinitionHub : Hub
    {
        public async Task SendMap(string user, object map)
        {
            await Clients.All.SendAsync("ReceiveMap", user, map);
        }
    }
}
