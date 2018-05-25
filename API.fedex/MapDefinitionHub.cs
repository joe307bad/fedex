using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace WebApplication1
{
    public class MapDefinitionHub : Hub
    {
        public void BroadcastMap(string name, object message)
        {
            // Call the broadcastMessage method to update clients.
            Clients.All.SendAsync("broadcastMap", name, message);
        }
    }
}
